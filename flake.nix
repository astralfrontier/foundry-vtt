{
  description = "Foundry VTT files, including macros";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        packagename = "astralfrontier-foundry-vtt";
        packageversion = "1.0.0";
        pkgs = nixpkgs.legacyPackages.${system};
        builddeps = with pkgs; [
          nodejs
        ];
      in
      {
        devShell = pkgs.mkShell {
          name = packagename;
          packages = builddeps;
        };
      }
    );
}
