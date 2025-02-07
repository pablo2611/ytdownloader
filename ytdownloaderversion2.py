import os
import urllib.parse
import yt_dlp
import time

# ────── CÓDIGO ORIGINAL (NO MODIFICAR) ──────

def limpiar_url(url):
    """
    Limpia la URL eliminando los parámetros extras (query y fragment).
    """
    parsed = urllib.parse.urlparse(url)
    return f"{parsed.scheme}://{parsed.netloc}{parsed.path}"

def progreso_hook(d):
    """
    Función hook para mostrar el progreso de la descarga.
    Solo muestra el porcentaje de 0 a 100%.
    """
    if d['status'] == 'downloading':
        total = d.get('total_bytes') or d.get('total_bytes_estimate')
        if total:
            percent = d.get('downloaded_bytes', 0) * 100 / total
            print(f"\rDescargando: {percent:.2f}%", end="")
    elif d['status'] == 'finished':
        print("\nDescarga completada.")

def descargar_video(url):
    url_limpia = limpiar_url(url)
    print("Usando URL limpia:", url_limpia)

    # Determinar la carpeta de descargas según el sistema operativo.
    if os.name == 'nt':  # Windows
        carpeta_descargas = os.path.join(os.path.expanduser('~'), 'Downloads')
    else:  # macOS y Linux (posiblemente 'Descargas')
        carpeta_descargas = os.path.join(os.path.expanduser('~'), 'Descargas')

    ydl_opts = {
        'outtmpl': os.path.join(carpeta_descargas, '%(title)s.%(ext)s'),
        'progress_hooks': [progreso_hook],
        'user_agent': ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                       'AppleWebKit/537.36 (KHTML, like Gecko) '
                       'Chrome/115.0.0.0 Safari/537.36')
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            ydl.download([url_limpia])
        except Exception as e:
            print(f"\nError: {e}")

# ────── FIN CÓDIGO ORIGINAL ──────


# ────── CÓDIGO EXTRA: ANIMACIONES Y MENÚ INTERACTIVO ──────

def animacion_carga(label, duration=2):
    """
    Muestra una animación de carga en forma de barra de progreso que va de 0 a 100%.
    """
    pasos = 50
    for i in range(pasos + 1):
        porcentaje = (i / pasos) * 100
        barra = "█" * i + "-" * (pasos - i)
        print(f"\r{label}: [{barra}] {porcentaje:.0f}%", end="")
        time.sleep(duration / pasos)
    print()  # Salto de línea al finalizar

def menu_interactivo():
    """
    Muestra un menú interactivo para que el usuario pueda descargar
    más videos o salir del programa.
    """
    while True:
        print("\n=== Menú de Descargas de YouTube ===")
        print("1. Descargar video")
        print("2. Salir")
        opcion = input("Selecciona una opción: ")
        if opcion == '1':
            url_video = input("\nIntroduce la URL del video de YouTube: ")
            print("\nPreparando descarga...")
            animacion_carga("Preparando", duration=1)
            descargar_video(url_video)
            print("\nFinalizando descarga...")
            animacion_carga("Finalizando", duration=2)
        elif opcion == '2':
            print("Saliendo del programa...")
            break
        else:
            print("Opción no válida, intenta de nuevo.")

if __name__ == '__main__':
    menu_interactivo()
