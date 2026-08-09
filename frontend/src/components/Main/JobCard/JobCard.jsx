import PropTypes from "prop-types";
import savedIconMarked from "../../../assets/images/save-icon_marked.png";
import savedIconUnmarked from "../../../assets/images/save-icon_unmarked.png";
import "./JobCard.css";

function JobCard({
  title,
  company,
  location,
  link,
  isSaved = false,
  onToggleSave = () => {},
}) {
  const meta = [company, location].filter(Boolean).join(" · ");

  return (
    <article className="job-card">
      <div className="job-card__info">
        {link ? (
          <a
            className="job-card__title-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="job-card__title">{title}</h3>
          </a>
        ) : (
          <h3 className="job-card__title">{title}</h3>
        )}
        {meta && <p className="job-card__meta">{meta}</p>}
      </div>

      <button
        className="job-card__save"
        type="button"
        onClick={onToggleSave}
        aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
      >
        <img
          className="job-card__save-icon"
          src={isSaved ? savedIconMarked : savedIconUnmarked}
          alt=""
        />
      </button>
    </article>
  );
}

JobCard.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string,
  location: PropTypes.string,
  link: PropTypes.string,
  isSaved: PropTypes.bool,
  onToggleSave: PropTypes.func,
};

export default JobCard;
