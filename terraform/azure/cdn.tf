resource "azurerm_cdn_profile" "cdn_profile" {
  name                = "${local.nameprefix}CDNProfile"
  location            = var.location
  resource_group_name = azurerm_resource_group.resource_group.name
  sku                 = "Standard_Microsoft"
  tags = merge(local.common_tags)
}

resource "azurerm_cdn_endpoint" "cdn_endpoint" {
  name                = "${local.nameprefix}CDNEndpoint"
  profile_name        = azurerm_cdn_profile.cdn_profile.name
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  origin_host_header = azurerm_app_service.app_service.default_site_hostname
  origin {
    name      = "${local.nameprefix}CDNEndpoint"
    host_name = azurerm_app_service.app_service.default_site_hostname
  }
  tags = merge(local.common_tags)
}