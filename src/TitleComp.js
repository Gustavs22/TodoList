import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

export default function TitleComp() {
  return (
    <div className="TitleView">
      <FontAwesomeIcon className="TitleIcon" icon={faListCheck} />
      <span className="TitleStyle"> Darāmo lietu aplikācija</span>;
    </div>
  );
}
