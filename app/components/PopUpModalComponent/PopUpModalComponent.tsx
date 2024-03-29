import { PopUpModalComponentProps } from "./PopUpModalComponent.props";

export default function PopUpModalComponent({
  setIsRemoveModalOpen,
  removePlanetFromFavorite,
}: PopUpModalComponentProps) {
  return (
    <div
      className="popup-modal-component"
      onClick={() => setIsRemoveModalOpen(false)}
    >
      <div
        className="popup-modal-component__dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-modal-component__dialog--title">
          <span className="popup-modal-component__dialog--title-text">
            Remove favorite
          </span>
          <div
            className="popup-modal-component__dialog--title-remove"
            onClick={() => setIsRemoveModalOpen(false)}
          >
            <picture>
              <img src="/icons/removeIcon.svg" alt="remove-icon" />
            </picture>
          </div>
        </div>
        <div className="popup-modal-component__dialog--content">
          <span className="popup-modal-component__dialog--content-text">
            Planet will be removed from favorites
          </span>
          <div className="popup-modal-component__dialog--content-actions">
            <button
              className="popup-modal-component__dialog--content-actions-cancel"
              onClick={() => setIsRemoveModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="popup-modal-component__dialog--content-actions-remove"
              onClick={removePlanetFromFavorite}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
