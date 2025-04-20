'use client';

import Container from "./Container";
import Heading from "./Heading";
import { PulseLoader } from "react-spinners";

const LoadingState = () => {
  return (
    <Container>
      <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading
          center
          title="Loading..."
          subtitle="Please wait while we load the content."
        />
        <div className="mt-4">
          <PulseLoader color="#F43F5E" size={10} />
        </div>
      </div>
    </Container>
  );
}

export default LoadingState; 