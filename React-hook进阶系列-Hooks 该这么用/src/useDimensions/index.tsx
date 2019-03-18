import * as React from 'react'

type RefFC = (node: any) => void
type Dimensions = ClientRect | DOMRect | Object

export default function useDimensions() : [RefFC, Dimensions] {
  const [dimensions, setDimensions] = React.useState<ClientRect | DOMRect | Object>({});
  const ref = React.useCallback(node => {
    if (node) {
      setDimensions(node.getBoundingClientRect().toJSON());
    } else {
      setDimensions({});
    }
  }, []);

  return [ref, dimensions];   
}
