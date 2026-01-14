import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';

const Button = ({ 
  children, 
  loading = false, 
  icon: Icon, 
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  rounded = false,
  fullWidth = false,
  ...props 
}) => {
  return (
    <BootstrapButton
      variant={variant}
      size={size}
      disabled={loading}
      className={`
        ${rounded ? 'rounded-pill' : ''}
        ${fullWidth ? 'w-100' : ''}
        d-flex align-items-center justify-content-center
        position-relative
      `}
      {...props}
    >
      {loading && (
        <Spinner
          animation="border"
          size="sm"
          className={iconPosition === 'left' ? 'me-2' : 'ms-2'}
        />
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="me-2" />
      )}
      
      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="ms-2" />
      )}
      
      {loading && (
        <span className="position-absolute">
          {children}
        </span>
      )}
    </BootstrapButton>
  );
};

export default Button;