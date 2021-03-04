import { useState } from 'react'
import styles from './login.module.css'
import { useRouter } from 'next/router'
import Spinner from '../components/Spinner/Spinner'
import useLocalStorage from '../hooks/useLocalStorage'
import ids from 'short-id'

const Login = () => {
  const [id, setId] = useLocalStorage('id')
  const [loginLoading, setLoginLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [data, setData] = useState({
    id: '',
  })

  const router = useRouter()

  const OPTIONS = {
    length: 5,
    algorithm: 'sha1',
    salt: Math.random,
  }

  ids.configure(OPTIONS)

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = e => {
    e.preventDefault()
    setLoginLoading(true)
    const { id } = data
    if (id === '') {
      setLoginLoading(false)
      return null
    }

    setId(id)

    const timeout = setTimeout(() => {
      setLoginLoading(false)
    }, 500)

    setData({
      id: '',
    })

    router.push('/chat')

    return () => clearTimeout(timeout)
  }

  const handleCreate = e => {
    e.preventDefault()

    setCreateLoading(true)

    setId(ids.generate())

    const timeout = setTimeout(() => {
      setCreateLoading(false)
    }, 500)

    router.push('/chat')

    return () => clearTimeout(timeout)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__form_container}>
        <form className={styles.form_container__form}>
          <p className={styles.form__heading_text}>Welcome back! 👋</p>
          <input
            placeholder="Your id"
            className="input"
            onChange={e => handleChange(e)}
            name="id"
            value={data.email}
            type="text"
          />

          <button onClick={e => handleLogin(e)} className="btn btn_primary">
            {!loginLoading ? 'Login' : <Spinner />}
          </button>

          <p className={styles.form__helper_text}>
            Not registered? No problem!{' '}
          </p>
          <button onClick={e => handleCreate(e)} className="btn btn_secondary">
            {!createLoading ? (
              'Create user'
            ) : (
              <Spinner
                reverserSpinColor={'rgba(255, 255, 255, 0.5)'}
                spinColor={'#1da0f2'}
              />
            )}
          </button>
        </form>
        <div className={styles.form_container__welcome_container}>
          <div className={styles.welcome_container__image_container}>
            <img className={styles.image_container__image} src="/welcome.svg" />
          </div>
          <p className={styles.welcome_container__text}>
            Create an account or login to start chatting
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
