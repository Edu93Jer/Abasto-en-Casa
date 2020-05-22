import React, { Component } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;
class FAQ extends Component {
  render() {
    return (
      <>
        <h1>Preguntas Frecuentes</h1>
        <Collapse accordion>
          <Panel header="¿Cuál es el horario de atención?" key="1">
            <p>
              Estamos listos para ayudarte de lunes a viernes de 9 a 18hrs en el correo
              contacto@abasto-en-casa.com, nuestro call center ( (55) 5351 6777), o puedes escribir por
              whatsapp mediante la página web.
            </p>
          </Panel>
          <Panel header="¿Cuánto cuesta la entrega de los productos?" key="2">
            <p>
              El costo de entrega para toda el Área Metropolitana de la CDMX es de $195 pesos. En
              compras mayores a $899 la entrega es gratis.
            </p>
          </Panel>
          <Panel header="¿Cuál es la empresa responsable de la entrega de los productos?" key="3">
            <p>
              Trabajamos con aliados comerciales para la distribución de nuestros productos ,
              contamos con camiones refrigerados y con el seguimiento puntual de tu pedido desde que
              sale de nuestra bodega hasta llegar a la puerta de tu casa.
            </p>
          </Panel>
          <Panel header="¿Cómo puedo hacer el seguimiento de mi pedido?" key="4">
            <p>
              Te mandaremos un correo cuando el proveedor de entrega haga la recolección y tu pedido
              salga del almacén a tu casa. Si tienes dudas respecto al estatus de tu pedido,
              escríbenos a contacto@abasto-en-casa.com con la información de tu pedido.
            </p>
          </Panel>
          <Panel header="Horarios de entrega" key="5">
            <p>
              Tu pedido llegará a su destino dependiendo el área en el que te encuentres. Dentro de
              la Ciudad de México el tiempo máximo de entrega es de 24hrs, en la periferie de la
              CDMX de 24 a 48hrs.
            </p>
          </Panel>
          <Panel header="Entregas internacionales" key="6">
            <p>
              Por el momento no contamos con servicio de entrega internacional en la plataforma,
              pero puedes escribirnos a contacto@abasto-en-casa.com para cotizar un envío.
            </p>
          </Panel>
          <Panel header="No recibí mi pedido ¿Qué puedo hacer?" key="7">
            <p>
              En caso de que haya pasado el tiempo de entrega seleccionado para tu compra y aún no
              cuentes con tu producto, por favor manda un correo a contacto@abasto-en-casa.com o
              comunícate a nuestro Call Center con la información de tu pedido.
            </p>
          </Panel>
          <Panel header="Devoluciones, ¿Te arrepentiste de la compra realizada?" key="8">
            <p>
              Si el producto que recibiste no es el mismo que solicitaste o viene dañado, no te
              preocupes, podemos hacer el cambio físico de producto o devolución de tu dinero
              llevando el siguiente proceso: Escríbenos un correo a contacto@abasto-en-casa.com o
              comunícate al Call Center con la información de tu pedido explicando la situación
              específica del motivo de tu devolución. Nos pondremos en contacto contigo para
              coordinar la recolección del producto. Recibiremos el producto y evaluaremos la
              situación. Te notificaremos si procede el cambio físico o la devolución de tu dinero.
              Cambios físicos y devoluciones aplican sobre los siguientes términos: El producto
              recibido no fue el mismo que el solicitado. El producto ha sido dañado durante la
              entrega
            </p>
          </Panel>
        </Collapse>
      </>
    );
  }
}

export default FAQ;
