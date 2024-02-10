import PropTypes from 'prop-types'

import './style.scss'

export const FIELD_TYPES = {
    INPUT_TEXT: 1,
    TEXTAREA: 2,
}

const Field = ({
    type = FIELD_TYPES.INPUT_TEXT,
    label,
    name,
    placeholder,
    onChange,
    value,
}) => {
    let component
    switch (type) {
        case FIELD_TYPES.INPUT_TEXT:
            component = (
                <input
                    type="text"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    data-testid="field-testid"
                    onChange={onChange}
                />
            )
            break
        case FIELD_TYPES.TEXTAREA:
            component = (
                <textarea
                    name={name}
                    value={value}
                    data-testid="field-testid"
                    // ajout onChange
                    onChange={onChange}
                />
            )
            break
        default:
            component = (
                <input
                    type="text"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    data-testid="field-testid"
                />
            )
    }
    return (
        <div className="inputField">
            <span>{label}</span>
            {component}
        </div>
    )
}

Field.propTypes = {
    type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
}
Field.defaultProps = {
    label: '',
    placeholder: '',
    value: '',
    type: FIELD_TYPES.INPUT_TEXT,
    name: 'field-name',
    onChange: () => null,
}

export default Field
