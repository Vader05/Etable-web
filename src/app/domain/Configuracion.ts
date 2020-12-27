export class Configuracion {
    cconfiguracion: number;
    cempresa: string;
    empnombre: string;
    empdescripcion: string;
    empdireccion: string;
    empemail: string;
    empcelular: number;
    emplogo: string;
    sist_reservacion_cliente: boolean;
    sist_atencion_cliente: boolean;
    mesas_compuestas: boolean;
    agregar_cliente_manual: boolean;
    pagos_tarjeta_credito: boolean;
    reservacion_pedidos: boolean;
    reservas_especiales: boolean;
    reservas_no_sesionadas: boolean;
    date_configurado: boolean;
    cant_max_mesas: number;
    cant_max_us_registrados: number;
    horario_ini_atencion: string;
    horario_fin_atencion: string;
    dias_atencion: string;
    max_us_trab_conectados: number;

    imageByte: string;
    imageName: string;


    public setConfiguracion(configuracion: Configuracion) {
        this.cconfiguracion = configuracion.cconfiguracion;
        this.cempresa = configuracion.cempresa;
        this.empnombre = configuracion.empnombre;
        this.empdescripcion = configuracion.empdescripcion;
        this.empdireccion = configuracion.empdireccion;
        this.empemail = configuracion.empemail;
        this.emplogo = configuracion.emplogo;
        this.empcelular = configuracion.empcelular;
        this.sist_reservacion_cliente = configuracion.sist_reservacion_cliente;
        this.sist_atencion_cliente = configuracion.sist_atencion_cliente;
        this.pagos_tarjeta_credito = configuracion.pagos_tarjeta_credito;
        this.mesas_compuestas = configuracion.mesas_compuestas;
        this.reservas_especiales = configuracion.reservas_especiales;
        this.reservacion_pedidos = configuracion.reservacion_pedidos;
        this.agregar_cliente_manual = configuracion.agregar_cliente_manual;
        this.reservas_no_sesionadas = configuracion.reservas_no_sesionadas;
        this.date_configurado = configuracion.date_configurado;
    }

    public setParametros(configuracion: Configuracion) {
        this.cconfiguracion = configuracion.cconfiguracion;
        this.cant_max_mesas = configuracion.cant_max_mesas;
        this.cant_max_us_registrados = configuracion.cant_max_us_registrados;
        this.horario_ini_atencion = configuracion.horario_ini_atencion;
        this.horario_ini_atencion = configuracion.horario_ini_atencion;
        this.horario_fin_atencion = configuracion.horario_fin_atencion;
        this.dias_atencion = configuracion.dias_atencion;
        this.max_us_trab_conectados = configuracion.max_us_trab_conectados;
    }

    public getDiasAtencion() {
        const dias = this.dias_atencion.split(',');
        return dias;
    }

}