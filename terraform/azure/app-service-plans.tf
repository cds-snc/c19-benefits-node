
resource "azurerm_app_service_plan" "app_service_plan" {
  name                = "${var.name}Asp"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "PremiumV2"
    size = "P1v2"
  }

  tags = {
    "project-code" = "esdc-covid-19-dts"
  }
}
resource "azurerm_app_service_plan" "asp_non_prod" {
  name                = "${var.name}NonProd"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "PremiumV2"
    size = "P1v2"
  }

  tags = {
    "project-code" = "esdc-covid-19-dts"
  }
}

resource "azurerm_app_service_plan" "devtest" {
  name                = "${var.name}DevTest"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Standard"
    size = "S1"
  }

  tags = {
    "project-code" = "esdc-covid-19-dts"
  }
}

