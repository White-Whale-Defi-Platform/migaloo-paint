use crate::error::ContractError;

pub fn validate_color(color: &String) -> Result<String, ContractError> {
    if color.starts_with('#') && color.len() == 7 && color.chars().skip(1).all(|c| c.is_digit(16)) {
        Ok(color.to_uppercase())
    } else {
        Err(ContractError::InvalidColorFormat {})
    }
}
