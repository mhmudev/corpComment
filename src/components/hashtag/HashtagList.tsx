import HashtagItem from "./HashtagItem";

type HashtagListProps = {
  companies: string[];
  handleSelectCompany: (company: string) => void;
};

export default function HashtagList({
  companies,
  handleSelectCompany,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      {companies.map((company) => (
        <HashtagItem company={company} onSelectCompany={handleSelectCompany} />
      ))}
    </ul>
  );
}
