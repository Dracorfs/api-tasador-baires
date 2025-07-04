# Imagen oficial de Deno
FROM denoland/deno:1.44.1

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos todos los archivos necesarios
COPY . .

# Puertos expuestos (coincide con el puerto por defecto de Deno)
EXPOSE 8000

# Permisos: red
CMD ["run", "--allow-net", "api.ts"]