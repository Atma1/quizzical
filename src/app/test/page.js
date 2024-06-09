'use client';

import React from 'react';
import {useEffect, useState} from 'react';

export default function Name() {
  const [state, setState] = useState('');
  useEffect(()=> console.log('foo'), [state]);

  return (
    <h1>Hello World</h1>
  );
};
