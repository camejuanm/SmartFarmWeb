const passwordRequirement = ({
    capsLetterFlag,
    numberFlag,
    pwdLengthFlag,
    specialCharFlag,
}) => {
    return(
        <div>
            <div className="message">
                <p className={capsLetterFlag}>Must contain 1 Capital Letter</p>
                <p className={numberFlag}>Must contain number</p>
                <p className={pwdLengthFlag}>Must be at least 6 Chars long</p>
                <p className={specialCharFlag}>Must contain special characters</p>
            </div>
        </div>
    );
}

export default passwordRequirement