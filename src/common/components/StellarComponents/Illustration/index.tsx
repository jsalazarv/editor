import DefaultIllustration from '@assets/images/stellar/page-illustration.svg';

interface IllustrationProps {
  illustration?: string;
}

const Illustration = ({
  illustration = DefaultIllustration,
}: IllustrationProps) => {
  return (
    <div
      className="md:block absolute left-1/2 -translate-x-1/2 -mt-16 blur-2xl opacity-90 pointer-events-none -z-10"
      aria-hidden="true">
      <img src={illustration} className="max-w-none" alt="Hormas el Arbol" />
    </div>
  );
};

export default Illustration;
