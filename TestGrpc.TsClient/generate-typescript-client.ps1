$path = "./generated"
If(!(Test-Path $path))
{
	New-Item -ItemType Directory -Force -Path $path
}

Set-Location -Path .\bin

Start-Process `
	-FilePath ".\protoc" `
	-ArgumentList "--proto_path=..\..\Protos --js_out=import_style=commonjs,binary:..\generated --grpc-web_out=import_style=typescript,mode=grpcwebtext:..\generated ..\..\Protos\*.proto"

Set-Location -Path ..