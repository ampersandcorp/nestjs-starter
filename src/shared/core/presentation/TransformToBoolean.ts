import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';

/**
 * Transform to boolean
 * @param transform
 * @constructor
 */
const TransformToBoolean = (transform: TransformFnParams): boolean => transform.value.toString() === 'true';

export default TransformToBoolean;
