import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';
import { isArray } from 'class-validator';

/**
 * It accepts both comma-separated string value of query parameter and multiple values of same query parameter.
 * @param transform
 */
const TransformCommaToArray = (transform: TransformFnParams): string[] => isArray(transform.value) ? transform.value : transform.value.toString().split(',');

export default TransformCommaToArray;
