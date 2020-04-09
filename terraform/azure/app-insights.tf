resource "azurerm_application_insights" "covid-benefit" {
  name                = "${var.name}.app_insight"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  application_type    = "Node.JS"
}

