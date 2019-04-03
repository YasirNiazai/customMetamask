import assert from 'assert'
import proxyquire from 'proxyquire'

let mapStateToProps, mergeProps

proxyquire('../currency-display.container.js', {
  'react-redux': {
    connect: (ms, md, mp) => {
      mapStateToProps = ms
      mergeProps = mp
      return () => ({})
    },
  },
})

describe('CurrencyDisplay container', () => {
  describe('mapStateToProps()', () => {
    it('should return the correct props', () => {
      const mockState = {
        metamask: {
          conversionRate: 280.45,
          currentCurrency: 'usd',
          nativeCurrency: 'OVX',
        },
      }

      assert.deepEqual(mapStateToProps(mockState), {
        conversionRate: 280.45,
        currentCurrency: 'usd',
        nativeCurrency: 'OVX',
      })
    })
  })

  describe('mergeProps()', () => {
    it('should return the correct props', () => {
      const mockStateProps = {
        conversionRate: 280.45,
        currentCurrency: 'usd',
        nativeCurrency: 'OVX',
      }

      const tests = [
        {
          props: {
            value: '0x2386f26fc10000',
            numberOfDecimals: 2,
            currency: 'usd',
            nativeCurrency: 'OVX',
          },
          result: {
            displayValue: '$2.80',
            suffix: 'USD',
            nativeCurrency: 'OVX',
          },
        },
        {
          props: {
            value: '0x2386f26fc10000',
            currency: 'usd',
            nativeCurrency: 'OVX',
          },
          result: {
            displayValue: '$2.80',
            suffix: 'USD',
            nativeCurrency: 'OVX',
          },
        },
        {
          props: {
            value: '0x1193461d01595930',
            currency: 'OVX',
            nativeCurrency: 'OVX',
            numberOfDecimals: 3,
          },
          result: {
            displayValue: '1.266',
            suffix: 'OVX',
            nativeCurrency: 'OVX',
          },
        },
        {
          props: {
            value: '0x1193461d01595930',
            currency: 'OVX',
            nativeCurrency: 'OVX',
            numberOfDecimals: 3,
            hideLabel: true,
          },
          result: {
            nativeCurrency: 'OVX',
            displayValue: '1.266',
            suffix: undefined,
          },
        },
        {
          props: {
            value: '0x3b9aca00',
            currency: 'OVX',
            nativeCurrency: 'OVX',
            denomination: 'GWEI',
            hideLabel: true,
          },
          result: {
            nativeCurrency: 'OVX',
            displayValue: '1',
            suffix: undefined,
          },
        },
        {
          props: {
            value: '0x3b9aca00',
            currency: 'OVX',
            nativeCurrency: 'OVX',
            denomination: 'WEI',
            hideLabel: true,
          },
          result: {
            nativeCurrency: 'OVX',
            displayValue: '1000000000',
            suffix: undefined,
          },
        },
        {
          props: {
            value: '0x3b9aca00',
            currency: 'OVX',
            nativeCurrency: 'OVX',
            numberOfDecimals: 100,
            hideLabel: true,
          },
          result: {
            nativeCurrency: 'OVX',
            displayValue: '0.000000001',
            suffix: undefined,
          },
        },
      ]

      tests.forEach(({ props, result }) => {
        assert.deepEqual(mergeProps(mockStateProps, {}, { ...props }), result)
      })
    })
  })
})
