import React from "react";

import { minidenticon } from "minidenticons";

interface Props {
  saturation?: number;
  lightness?: number;
}

const useGetProfilePic = ({ saturation = 96, lightness = 20 }: Props) => {
  const getImageUri = React.useCallback(
    (userName: string) =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(userName, saturation, lightness)),
    [lightness, saturation]
  );

  return { getImageUri };
};

export default useGetProfilePic;
