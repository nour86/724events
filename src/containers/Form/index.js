import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Field, { FIELD_TYPES } from '../../components/Field'
import Select from '../../components/Select'
import Button, { BUTTON_TYPES } from '../../components/Button'

const mockContactApi = () =>
    new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })

const Form = ({ onSuccess, onError }) => {
    const defaultFormValues = {
        nom: '',
        prenom: '',
        personel: '',
        email: '',
        message: 'message',
    }
    const [formValues, setFormValues] = useState(defaultFormValues)
    const [sending, setSending] = useState(false)
    const sendContact = useCallback(
        async (evt) => {
            evt.preventDefault()
            setSending(true)
            // We try to call mockContactApi
            try {
                await mockContactApi()
                setSending(false)
                // vide les champs du formulaire
                setFormValues(defaultFormValues)
                //  OnSuccess => affiche la Modal "Message Envoyé"
                onSuccess()
            } catch (err) {
                setSending(false)
                onError(err)
            }
        },
        [onSuccess, onError]
    )
    return (
        <form onSubmit={sendContact}>
            <div className="row">
                <div className="col">
                    <Field
                        placeholder=""
                        label="Nom"
                        value={formValues.nom}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                nom: e.target.value,
                            })
                        }
                    />
                    <Field
                        placeholder=""
                        label="Prénom"
                        value={formValues.prenom}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                prenom: e.target.value,
                            })
                        }
                    />
                    <Select
                        selection={['Personel', 'Entreprise']}
                        // onChange={() => null}
                        onChange={(value) => {
                            setFormValues({
                                ...formValues,
                                personel: value,
                            })
                        }}
                        value={formValues.personel}
                        label="Personel / Entreprise"
                        type="large"
                        titleEmpty
                    />
                    <Field
                        placeholder=""
                        label="Email"
                        onChange={(e) => {
                            setFormValues({
                                ...formValues,
                                email: e.target.value,
                            })
                        }}
                        value={formValues.email}
                    />
                    <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
                        {sending ? 'En cours' : 'Envoyer'}
                    </Button>
                </div>
                <div className="col">
                    <Field
                        placeholder="message"
                        label="Message"
                        type={FIELD_TYPES.TEXTAREA}
                        onChange={(e) => {
                            setFormValues({
                                ...formValues,
                                message: e.target.value,
                            })
                        }}
                        value={formValues.message}
                    />
                </div>
            </div>
        </form>
    )
}

Form.propTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
}

Form.defaultProps = {
    onError: () => null,
    onSuccess: () => null,
}

export default Form
