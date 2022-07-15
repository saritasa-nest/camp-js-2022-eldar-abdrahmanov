/** Checking if an element exists.
 * @param parentElement Looking for in this element.
 * @param selector The element selector we are looking for.
 */
export function getElement<T extends Element>(parentElement: Element | Document, selector: string): T {
  const element = parentElement.querySelector<T>(
    selector,
  );
  if (element === null) {
    throw new Error(`Element ${selector} not found`);
  }
  return element;
}
