import { useRef } from 'react';

const Invoices = () => {
  const highestPage = useRef(0);

  return <div>Test {highestPage.current}</div>;
};

export default Invoices;
