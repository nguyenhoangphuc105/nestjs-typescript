import {
  MetricDistanceUnit,
  MetricTemperatureUnit,
} from 'src/constants/metric';

export function convertDistance(
  value: number,
  fromUnit: MetricDistanceUnit,
  toUnit: MetricDistanceUnit,
): number {
  const conversionRates = {
    [MetricDistanceUnit.METER]: 1,
    [MetricDistanceUnit.CENTIMETER]: 100,
    [MetricDistanceUnit.INCH]: 39.3701,
    [MetricDistanceUnit.FEET]: 3.28084,
    [MetricDistanceUnit.YARD]: 1.09361,
  };

  const valueInMeters: number = value / conversionRates[fromUnit];
  return valueInMeters * conversionRates[toUnit];
}

export function convertTemperature(
  value: number,
  fromUnit: MetricTemperatureUnit,
  toUnit: MetricTemperatureUnit,
): number {
  if (fromUnit === toUnit) return value;

  switch (fromUnit) {
    case MetricTemperatureUnit.C:
      return toUnit === MetricTemperatureUnit.F
        ? (value * 9) / 5 + 32
        : value + 273.15;

    case MetricTemperatureUnit.F:
      return toUnit === MetricTemperatureUnit.C
        ? ((value - 32) * 5) / 9
        : ((value - 32) * 5) / 9 + 273.15;

    case MetricTemperatureUnit.K:
      return toUnit === MetricTemperatureUnit.C
        ? value - 273.15
        : ((value - 273.15) * 9) / 5 + 32;

    default:
      return value;
  }
}
