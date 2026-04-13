import * as RadixButton from '@radix-ui/react-button';
import React from 'react';

const Button = React.forwardRef((props, ref) => {
  return <RadixButton.Button ref={ref} className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600" {...props} />;
});

Button.displayName = 'Button';

export default Button;