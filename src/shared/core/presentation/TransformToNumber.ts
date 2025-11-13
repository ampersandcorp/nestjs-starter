import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';

/**
 * Transform to number
 * @param transform
 * @constructor
 */
const TransformToNumber = (transform: TransformFnParams): number => Number(transform.value);

export default TransformToNumber;
