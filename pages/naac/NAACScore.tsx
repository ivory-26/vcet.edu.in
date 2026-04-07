import { useEffect } from 'react';
import { resolveBackendHref } from '../../utils/uploadedAssets';

const NAACScore: React.FC = () => {
  useEffect(() => {
    window.location.replace(resolveBackendHref('/pdfs/NAAC/NAACAccreditationScore/Naac-Certificate.pdf'));
  }, []);

  return null;
};

export default NAACScore;
