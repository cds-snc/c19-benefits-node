locals {
  common_tags = {
    CsdId          = "Unknown"
    Branch         = "TISMB"
    Classification = "Unclassified"
    Directorate    = "Unknown"
    Environment    = var.environment
    Project        = "Unknown"
    ServiceOwner   = var.service_owner
    Version        = var.infra_version
  }
  nameprefix      = "Es${var.environmentprefix}${var.locationprefix}${var.name}"
}
