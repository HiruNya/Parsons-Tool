export const Modal = ({ open, title, description, buttons }) => (
  <>
    {open && (
      <div className={'modal modal-open'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action justify-evenly">
            {Object.entries(buttons || {}).map(([key, { name, classes, onClick }]) => (
              <button
                key={key}
                htmlFor="modal"
                className={'btn' + (classes ? ' ' + classes.join(' ') : '')}
                onClick={onClick}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    )}
  </>
);

export default Modal;
