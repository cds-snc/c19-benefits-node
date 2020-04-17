
resource "azurerm_cdn_profile" "cdn_en" { 
    resource_group_name = azurerm_resource_group.resource_group.name
    location = azurerm_resource_group.resource_group.location
    name = "${var.name}-cdnp-en"
    sku = "Standard_Microsoft"
}

resource "azurerm_cdn_profile" "cdn_fr" { 
    resource_group_name = azurerm_resource_group.resource_group.name
    location = azurerm_resource_group.resource_group.location
    name = "${var.name}-cdnp-fr"
    sku = "Standard_Microsoft"
}

resource "azurerm_cdn_endpoint" "cdne_en" { 
    resource_group_name = azurerm_resource_group.resource_group.name
    location = azurerm_resource_group.resource_group.location
    name = "${var.name}-cdne-en"
    profile_name = azurerm_cdn_profile.cdn_en.name

    origin { 
        name = "${azurerm_cdn_endpoint.cdne_en.name}-origin"
        host_name = azurerm_app_service.app_service.default_site_hostname
        http_port = "80"
        https_port = "443"
    }

    delivery_rule { 
        name = "hsts"
        order = 2
        request_scheme_condition { 
            operator = "Equal"
            match_values = "HTTPS"
        }
        modify_request_header_action { 
            name = "Strict-Transport-Security"
            action = "Overwrite"
            value = "max-age=31536000"
        }
    }
    delivery_rule { 
        name = "httphttpsredirect"
        order = 3
        request_scheme_condition { 
            operator = "Equal"
            match_values = "HTTP"
        }
        url_redirect_action {
            redirect_type = "move"
            protocol = "https"
        }
    }

}


resource "azurerm_cdn_endpoint" "cdne_fr" { 
    resource_group_name = azurerm_resource_group.resource_group.name
    location = azurerm_resource_group.resource_group.location
    name = "${var.name}-cdne-fr"
    profile_name = azurerm_cdn_profile.cdn_fr.name

    origin { 
        name = "${azurerm_cdn_endpoint.cdne_en.name}-origin"
        host_name = azurerm_app_service.app_service.default_site_hostname
        http_port = "80"
        https_port = "443"
    }

    delivery_rule { 
        name = "hsts"
        order = 2
        request_scheme_condition { 
            operator = "Equal"
            match_values = "HTTPS"
        }
        modify_request_header_action { 
            name = "Strict-Transport-Security"
            action = "Overwrite"
            value = "max-age=31536000"
        }
    }

    delivery_rule { 
        name = "httphttpsredirect"
        order = 3
        request_scheme_condition { 
            operator = "Equal"
            match_values = "HTTP"
        }
        url_redirect_action {
            redirect_type = "move"
            protocol = "https"
        }
    }

}