package com.exam.model.auth;

/**
 * Enum to represent the authentication provider.
 */
public enum AuthProvider {
    LOCAL,  // For standard username/password registration
    GOOGLE,
    GITHUB  // Add other OAuth2 providers as needed
}