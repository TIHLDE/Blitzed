import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center h-screen">
        <FontAwesomeIcon
          icon={faCog}
          className="text-primary w-[100px] animate-spin"
        />
        <p className="text-2xl mt-4">Please wait while it is loading..</p>
      </div>
    </div>
  );
}
