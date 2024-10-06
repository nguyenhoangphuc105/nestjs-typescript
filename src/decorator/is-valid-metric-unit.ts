import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import {
  MetricDistanceUnit,
  MetricTemperatureUnit,
  MetricType,
} from 'src/constants/metric';

export function IsValidMetricUnit(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidMetricUnit',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(
          value: MetricDistanceUnit | MetricTemperatureUnit,
          args: ValidationArguments,
        ) {
          const type = (args.object as any).type;
          let isValid: boolean = false;
          if (
            type === MetricType.DISTANCE &&
            Object.values(MetricDistanceUnit).includes(
              value as MetricDistanceUnit,
            )
          ) {
            isValid = true;
          } else if (
            type === MetricType.TEMPERATURE &&
            Object.values(MetricTemperatureUnit).includes(
              value as MetricTemperatureUnit,
            )
          ) {
            isValid = true;
          }
          return isValid;
        },
        defaultMessage(args: ValidationArguments) {
          const value = args.value;
          const type = (args.object as any).type;
          if (
            type === MetricType.DISTANCE &&
            !Object.values(MetricDistanceUnit).includes(
              value as MetricDistanceUnit,
            )
          ) {
            return `${args.property} must be one of the following values: ${Object.values(MetricDistanceUnit).join(', ')}`;
          } else if (
            type === MetricType.TEMPERATURE &&
            !Object.values(MetricTemperatureUnit).includes(
              value as MetricTemperatureUnit,
            )
          ) {
            return `${args.property} must be one of the following values: ${Object.values(MetricTemperatureUnit).join(', ')}`;
          } else {
            return `${args.property} must be one of the following values: ${Object.values(MetricDistanceUnit).join(', ')}, ${Object.values(MetricTemperatureUnit).join(', ')}`;
          }
        },
      },
    });
  };
}
