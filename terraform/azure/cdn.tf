resource "azurerm_cdn_profile" "cdn_profile" {
  name                = "${var.name}CDNProfile"
  location            = var.location
  resource_group_name = azurerm_resource_group.resource_group.name
  sku                 = "Standard_Microsoft"
}

resource "azurerm_cdn_endpoint" "cdn_endpoint" {
  name                = "${var.name}CDNEndpoint"
  profile_name        = azurerm_cdn_profile.cdn_profile.name
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  origin_host_header = azurerm_app_service.app_service.default_site_hostname
  origin {
    name      = "${var.name}CDNEndpoint"
    host_name = azurerm_app_service.app_service.default_site_hostname
  }
}