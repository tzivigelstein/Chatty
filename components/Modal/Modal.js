import { useState } from 'react'
import styles from './modal.module.css'
import { CloseButton } from '../Buttons/Buttons'

const Modal = ({
  isModalOpen,
  onModalClose,
  modalConfig = {
    title: 'Your title here',
    helper: 'Secondary helper text ✍',
    submit: 'Submit',
    cancel: 'Cancel',
    inputPrimary: undefined,
    inputSecondary: undefined,
    checkBoxOptions: undefined,
    checkBoxState: undefined,
    checkBoxSet: undefined,
    callBack: undefined,
  },
}) => {
  const {
    title,
    helper,
    submit,
    cancel,
    inputPrimary,
    inputSecondary,
    checkBoxOptions,
    checkBoxState,
    checkBoxSet,
    callBack,
    setData,
    data,
  } = modalConfig

  const handleClick = e => {
    e.preventDefault()
    callBack()
  }

  const handleCheckBoxChange = id => {
    checkBoxSet(prev => {
      if (prev.includes(id)) {
        return prev.filter(prev => id !== prev)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div
      style={isModalOpen ? { display: 'flex' } : {}}
      className={styles.modal_container}
    >
      <div className={styles.modal_container__modal}>
        <CloseButton
          onClick={() => onModalClose()}
          className={styles.modal__close_button}
          stroke={'#696969'}
        />
        <h4 className={styles.modal__title}>{title}</h4>
        <p className={styles.modal__helper}>{helper}</p>
        {typeof inputPrimary !== 'undefined' && data && (
          <>
            <input
              name="name"
              value={data.name}
              placeholder={inputPrimary}
              className="input"
              type="text"
              onChange={e => handleChange(e)}
            />
            {typeof inputSecondary !== 'undefined' && data && (
              <input
                name="id"
                value={data.id}
                placeholder={inputSecondary}
                className="input"
                type="text"
                onChange={e => handleChange(e)}
              />
            )}
          </>
        )}

        {Array.isArray(checkBoxOptions) &&
          typeof checkBoxOptions !== 'undefined' &&
          checkBoxOptions.map(checkBox => (
            <div key={checkBox.id} style={{ color: '#696969' }}>
              <input
                value={checkBoxState.includes(checkBox.id)}
                id={checkBox.id}
                className="input_checkbox TODO"
                type="checkbox"
                onChange={() => handleCheckBoxChange(checkBox.id)}
              />
              <label htmlFor={checkBox.id}>{checkBox.name}</label>
            </div>
          ))}

        <div className={styles.modal__buttons_container}>
          <div
            style={{ marginRight: '0.5rem' }}
            className={styles.buttons_container__button_container}
          >
            <button onClick={handleClick} className="btn btn_primary">
              {submit}
            </button>
          </div>
          <div
            style={{ marginLeft: '0.5rem' }}
            className={styles.buttons_container__button_container}
          >
            <button
              onClick={() => onModalClose()}
              className="btn btn_secondary"
            >
              {cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
