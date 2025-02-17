import type { JSAction } from "entities/JSCollection";

export enum JSResponseState {
  IsExecuting = "IsExecuting",
  IsDirty = "IsDirty",
  IsUpdating = "IsUpdating",
  NoResponse = "NoResponse",
  ShowResponse = "ShowResponse",
  NoReturnValue = "NoReturnValue",
}

/**
 * Returns state of the JSResponseview editor component
 * @param currentFunction => Current function whose response is to be shown
 * @param isDirty => Object containing JS Object functions with parse errors
 * @param isExecuting => Object containing JS Object functions still executing
 * @param isSaving => Whether any entity is still saving in the application
 * @param responses => Object containing JS Object functions' responses
 * @returns => state of the JSResponseview editor component
 */
export function getJSResponseViewState(
  currentFunction: JSAction | null,
  isDirty: Record<string, boolean>,
  isExecuting: Record<string, boolean>,
  isSaving: boolean,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responses: Record<string, any>,
): JSResponseState {
  if (!currentFunction) return JSResponseState.NoResponse;

  if (isExecuting[currentFunction.id] && isSaving)
    return JSResponseState.IsUpdating;

  if (isExecuting[currentFunction.id]) return JSResponseState.IsExecuting;

  if (
    !responses.hasOwnProperty(currentFunction.id) &&
    !isExecuting.hasOwnProperty(currentFunction.id)
  )
    return JSResponseState.NoResponse;

  if (
    responses.hasOwnProperty(currentFunction.id) &&
    isDirty[currentFunction.id]
  )
    return JSResponseState.IsDirty;

  if (
    responses.hasOwnProperty(currentFunction.id) &&
    responses[currentFunction.id] === undefined
  )
    return JSResponseState.NoReturnValue;

  if (responses.hasOwnProperty(currentFunction.id))
    return JSResponseState.ShowResponse;

  // Default state
  return JSResponseState.NoResponse;
}
