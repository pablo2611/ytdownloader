import os
import yt_dlp
import time
from colorama import init, Fore, Style

# Inicializar colorama
init(autoreset=True)

# FUNCIONES INTERNAS 

def progreso_hook(d):
    if d['status'] == 'downloading':
        total = d.get('total_bytes') or d.get('total_bytes_estimate')
        if total:
            percent = d.get('downloaded_bytes', 0) * 100 / total
            print(f"\rDescargando: {percent:.2f}%", end="")
    elif d['status'] == 'finished':
        print("\nDescarga completada.")

def seleccionar_mejor_formato(url):
    # Ejecuta yt-dlp en modo extract para obtener mejor URL sin mostrar
    ydl_opts = {
        'quiet': True,
        'skip_download': True,
        'force_generic_extractor': False,
        'extract_flat': False
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(url, download=False)
            return info.get('webpage_url') or url
        except Exception:
            return url  # Si falla, usa URL original

def descargar_video(url):
    url_final = seleccionar_mejor_formato(url)

    if os.name == 'nt':
        carpeta_descargas = os.path.join(os.path.expanduser('~'), 'Downloads')
    else:
        carpeta_descargas = os.path.join(os.path.expanduser('~'), 'Descargas')

    ydl_opts = {
        'outtmpl': os.path.join(carpeta_descargas, '%(title)s.%(ext)s'),
        'progress_hooks': [progreso_hook],
        'user_agent': ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                       'AppleWebKit/537.36 (KHTML, like Gecko) '
                       'Chrome/115.0.0.0 Safari/537.36'),
        'quiet': False
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            ydl.download([url_final])
        except Exception as e:
            print(f"\nError: {e}")

#  MEJORAS VISUALES 

def animacion_carga(label, duration=2):
    pasos = 50
    for i in range(pasos + 1):
        porcentaje = (i / pasos) * 100
        barra = Fore.GREEN + "▓" * i + Fore.WHITE + "░" * (pasos - i)
        print(f"\r{label}: [{barra}] {porcentaje:.0f}%", end="", flush=True)
        time.sleep(duration / pasos)
    print()

def centrar_texto(texto, color=Fore.WHITE, ancho=80):
    espacios = (ancho - len(texto)) // 2
    return " " * espacios + color + texto

def mostrar_menu():
    os.system('cls' if os.name == 'nt' else 'clear')
    ancho = 60
    
    print(Fore.CYAN + "╔" + "═" * (ancho-2) + "╗")
    print(centrar_texto("YTDOWNLOADER v1.2", Fore.CYAN + Style.BRIGHT, ancho))
    print(Fore.CYAN + "╚" + "═" * (ancho-2) + "╝" + Style.RESET_ALL)

    print(centrar_texto("=== Menú de Descargas ===", Fore.YELLOW, ancho))
    print(centrar_texto("1. Descargar video", Fore.GREEN, ancho))
    print(centrar_texto("2. Salir", Fore.RED, ancho))
    print(Fore.CYAN + "═" * ancho)

def menu_interactivo():
    while True:
        mostrar_menu()
        opcion = input(centrar_texto("Selecciona una opción: ", Fore.WHITE, 60))

        if opcion == '1':
            url = input("\n" + centrar_texto("Introduce la URL: ", Fore.WHITE, 60) + "\n")
            print(centrar_texto("Preparando descarga...", Fore.YELLOW, 60))
            animacion_carga("Cargando", 1)
            descargar_video(url)
            print(centrar_texto("Descarga completada!", Fore.GREEN, 60))
            time.sleep(1)
        elif opcion == '2':
            print(centrar_texto("Saliendo...", Fore.RED, 60))
            break
        else:
            print(centrar_texto("Opción inválida!", Fore.RED, 60))
            time.sleep(1)

if __name__ == '__main__':
    menu_interactivo()
