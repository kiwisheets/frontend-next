/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link';
import { forwardRef } from 'react';

const Link = forwardRef(function Link(props, ref) {
  const { as, href, children, ...other } = props;

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other}>
        <>{children}</>
      </a>
    </NextLink>
  );
});

export default Link;
