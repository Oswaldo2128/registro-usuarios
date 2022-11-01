package mx.conacyt.crip.rizoma.registro.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import io.netty.util.internal.ThreadLocalRandom;

@Service
public class IdRizomaService {

	public static String crearIdr(String nombre, String ap) {

		String usuario = "";
		String[] arrNombre = nombre.split(" ");
		String[] arrAp = ap.split(" ");

		if (arrNombre.length == 1) {
			usuario += nombre;
		} else if (arrNombre.length == 2) {
			usuario += arrNombre[0] + conVoc(arrNombre[1]);
		} else {
			usuario += arrNombre[0];
			for (int i = 1; i < arrNombre.length; i++) {
				usuario += arrNombre[i].charAt(0);
			}
		}

		usuario += ".";

		if (arrAp.length == 1) {
			usuario += ap;
		} else if (arrAp.length == 2) {
			usuario += arrAp[0] + arrAp[1].charAt(0);
		} else {
			usuario += arrAp[0];
			for (int i = 1; i < arrAp.length; i++) {
				usuario += arrAp[i].charAt(0);
			}
		}

		return usuario;

	}

	public static String modificarIdr(String am, String idr) {
		String usuario = idr;
		if (!"".equals(am)) {
			usuario += conVoc(am);
		} else {
			String[] arrIdr = idr.split("\\.");
			usuario = arrIdr[1] + "." + arrIdr[0];
		}
		return usuario;
	}

	public static String generarClave(String idr) {
		return idr + cadenaAleatoria();
	}

    public static String conVoc(String apellido) {
		String consonantes = "";
		apellido = apellido.toLowerCase();
		int s = apellido.length();
		char k = ' ';
		for (int i = 0; i < s; i++) {
			k = apellido.charAt(i);
			if ((k == 97) || (k == 111) || (k == 101) || (k == 105) || (k == 117)) {
			} else {
				consonantes += k;
			}
		}
		return consonantes.toLowerCase();
	}

	public static String cadenaAleatoria() {
		String banco = "abcdefghijklmnopqrstuvwxyz";
		String cadena = "";
		for (int x = 0; x < 3; x++) {
			int indiceAleatorio = numeroAleatorioEnRango(0, banco.length() - 1);
			char caracterAleatorio = banco.charAt(indiceAleatorio);
			cadena += caracterAleatorio;
		}
		return cadena;
	}

	public static int numeroAleatorioEnRango(int minimo, int maximo) {
		return ThreadLocalRandom.current().nextInt(minimo, maximo + 1);
	}

}
