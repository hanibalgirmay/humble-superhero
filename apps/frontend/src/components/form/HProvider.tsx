import React from 'react';

type TCProvider = {
  handleFormSubmit: (data: any) => void;
  children: React.ReactNode;
};

const HProvider = ({ handleFormSubmit, children }: TCProvider) => {
  return <form onSubmit={handleFormSubmit}>{children}</form>;
};

export default HProvider;
