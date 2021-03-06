import * as path from 'path';
import GeneralError from '../../error/general-error';
import { PathOsBasedRelative } from '../path';
import BitId from '../../bit-id/bit-id';
import componentIdToPackageName from './component-id-to-package-name';

export default function getNodeModulesPathOfComponent(
  bindingPrefix: string | null | undefined,
  id: BitId,
  allowNonScope = false,
  defaultScope?: string | null // if an id doesn't have a scope, use defaultScope if exists. applies only when allowNonScope is true
): PathOsBasedRelative {
  if (!id.scope && !allowNonScope) {
    throw new GeneralError(
      `Failed creating a path in node_modules for ${id.toString()}, as it does not have a scope yet`
    );
  }
  const packageName = componentIdToPackageName(id, bindingPrefix, defaultScope);
  return path.join('node_modules', packageName);
}
