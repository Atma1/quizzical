import Image from 'next/image';
import babyMedium from '../../../public/baby-medium.svg';
import lemonyMedium from '../../../public/lemony-medium.svg';

export default function BackgroundSvg() {
  return (
    <div className='svg-container'>
      <Image
        alt="baby-medium svg"
        src={babyMedium}
        id='svg-baby-medium"'
      />
      <Image
        alt="lemony-medium svg"
        src={lemonyMedium}
        id='svg-lemony-medium"'
      />
    </div>
  );
}
