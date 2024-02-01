use crate::error::ContractError;

pub fn validate_color(color: &String) -> Result<String, ContractError> {
    if color.starts_with('#')
        && color.len() == 7
        && color.chars().skip(1).all(|c| c.is_ascii_hexdigit())
    {
        Ok(color.to_uppercase())
    } else {
        Err(ContractError::InvalidColorFormat {})
    }
}

#[test]
fn test_validate_color_not_starting_with_hash_should_fail() {
    let err = validate_color(&"afeaea9".to_string()).unwrap_err();
    assert_eq!(err, ContractError::InvalidColorFormat {});
}

#[test]
fn test_validate_color_with_6_digits_should_fail() {
    let err = validate_color(&"#afeae".to_string()).unwrap_err();
    assert_eq!(err, ContractError::InvalidColorFormat {});
}

#[test]
fn test_validate_color_with_non_hex_digits_should_fail() {
    let err = validate_color(&"#afeaor".to_string()).unwrap_err();
    assert_eq!(err, ContractError::InvalidColorFormat {});
}

#[test]
fn test_validate_color_with_uppercase_should_work() {
    let color = validate_color(&"#AFEAFA".to_string()).unwrap();
    assert_eq!(color, "#AFEAFA".to_string());
}

#[test]
fn test_validate_color_with_lowercase_should_work() {
    let color = validate_color(&"#afeafa".to_string()).unwrap();
    assert_eq!(color, "#AFEAFA".to_string());
}