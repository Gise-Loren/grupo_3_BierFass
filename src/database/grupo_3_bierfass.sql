-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2022 a las 05:41:50
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `grupo_3_bierfass`
--
CREATE DATABASE IF NOT EXISTS `grupo_3_bierfass`;
USE `grupo_3_bierfass`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(4) NOT NULL,
  `category` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'Industrial'),
(2, 'Artesanal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `type_id` int(15) NOT NULL,
  `imagen` varchar(500) NOT NULL,
  `stock` int(4) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `description` text NOT NULL,
  `alcohol` text NOT NULL,
  `bitterness` decimal(10,0) NOT NULL,
  `idealTemperature` text NOT NULL,
  `category_id` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `type_id`, `imagen`, `stock`, `price`, `description`, `alcohol`, `bitterness`, `idealTemperature`, `category_id`) VALUES
(10102, 'Bier World Rubia', 3, 'envase-bier.jpg', 50, '120', 'De aspecto cristalino con una abundante y densa espumas. Su carácter viene marcado por sus maltas que le otorgan un sabor dulce y afrutado, dejando el amargor y el aroma de los lúpulos en un segundo plano. Elaborada con malta suave.', '5%', '15', '6°-8°', 2),
(10103, 'Bier World Roja', 10, 'envase-bier.jpg', 50, '1200', 'De color cobre profundo, medianamente turbia, con espuma densa y cremosa. Se aprecian aromas a caramelo con suaves notas a lúpulo. En boca se denota un leve dulzor y sabor a granos tostados. ¿Qué le da el color rojo a la cerveza? El ingrediente encargado de darle color es la malta, en específico, el grado de tostado que tiene.--------------', '5%', '18', '8°-12°', 1),
(10104, 'Bier World Negra', 2, 'envase-bier.jpg', 50, '120', 'Su color oscuro es debido al uso de maltas especialmente oscuras durante su elaboración. La malta obtiene a su vez el color durante el procedimiento de tueste, ya que el grado de quemado es el que origina el color de la cerveza. Su sabor es fuerte y recuerda al chocolate o al café', '4%', '24', '8°-12°', 2),
(10106, 'Bier World Ipa', 4, 'envase-bier.jpg', 50, '120', 'Se caracteriza por su fermentación a baja temperatura y su sabor con mucha personalidad. Cabe destacar que elaboramos esta gran cerveza mediante la mezcla de procesos tradicionales y los métodos más vanguardistas. Su color dorado intenso y brillante atrae a primera vista, luego sorprende con su ligereza y un amargor que no invade la boca. Al final, revela un sabor sutilmente maltoso con recuerdos de lúpulo', '5.2%', '4', '9°-5°', 2),
(10107, 'Andes Origen Rubia', 1, 'andes-rubia.jpg', 50, '120', 'Andes Origen es una cerveza mendocina. Se recomienda servir en copa. Está hecha con agua de deshielo de la cordillera y pura malta tostada a fuego lento, que ofrece colores y texturas bien distintivas. Hay una rubia, una roja y una negra. Sabor a malta, leve aroma a lupulo y a cereal, cuerpo medio, refrescante.', '5.1%', '16', '3°', 1),
(10108, 'Patagonia Weisse', 10, 'patagonia-weisse.jpg', 50, '120', 'Una cerveza tipo Belgian Witbier, estilo elaborado con trigo, que le da una cremosidad característica. Tiene aroma a cáscara de naranja y coriandro. De una complejidad en aromas, que resulta fácil de tomar por su refrescancia, bajo amargor y cuerpo livano.', '5.1%', '20', '3°-5°', 1),
(50201, 'Imperial Lager', 7, 'imperial-lager.jpg', 50, '120', 'Imperial Lager, cerveza extra con ingredientes 100% naturales. Cerveza dorada, con espuma blanca de buena retención. Con un perfecto equilibrio entre el lúpulo y la malta. Baja presencia de lúpulo y ligeramente maltosa. Sabor limpio y de intensidad ideal. No debe sentirse astringencia. Con un final seco, fresco y limpio.', '5,5%', '15', '3°-6°', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `types`
--
DROP TABLE IF EXISTS `types`;
CREATE TABLE `types` (
  `id` int(4) NOT NULL,
  `type` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `types`
--

INSERT INTO `types` (`id`, `type`) VALUES
(1, 'Rubia'),
(2, 'Negra'),
(3, 'Roja'),
(4, 'Ipa'),
(5, 'Doble ipa'),
(6, 'Apa'),
(7, 'Lager'),
(8, 'Doble malta'),
(9, 'Vera ipa'),
(10, 'Wiesse');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(35) NOT NULL,
  `name` varchar(15) NOT NULL,
  `lastname` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` text NOT NULL,
  `category` varchar(15) NOT NULL,
  `imagen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `password`, `category`, `imagen`) VALUES
('09887a60-9962-4e8a-a', 'Lucas', 'Alvarez', 'lucaas2120@bierfass.com.a', '$2a$10$7fr8ID0yW0JCyVGDes3MBO2J6t6xE3ezUVLUpbRHMZhv/h8DgImb6', 'Admin', 'img-users-1667681668263.png'),
('0d6e2101-e3b8-497a-aa8f-64a22864fff', 'Juan', 'Perez', 'juanperez1.0@bierfass.com', '$2a$10$tASl4XptfA2mRgkvp8HHVuROU4y1L.VbyOhbgqJaJ2y5OUC5JrFaC', 'Admin', 'img-user-default.png'),
('1d307f6a-80d5-45e2-8ae1-dc454768e4c', 'Carlos', 'Acosta', 'carlos@acosta.com', '$2a$10$bcxXJV51wFTLeKSPRirHc.O2MV.yQZIzWSBqngy6Nfg450P4KuB8a', 'User', 'img-user-default.png'),
('a892c86d-19e8-40a3-9', 'Francisco', 'Cagnino', 'francagnino@bierfass.com.', '$2a$10$agmiq56Hl30XfQBYcP/giuwYq8t1i1LN42fBfLzH1U08RIHy/JEuK', 'Admin', 'img-users-1667681519688.png'),
('b45e9cc9-c7d1-4491-8c0b-e5b6b816450', 'Giancarlo', 'Guitre', 'gianguitre@bierfass.com.a', '$2a$10$GZ8m75mPA/VgfZDsEqNKGOWafV8M01YcahHN0xksuZtUtsrZPxn4S', 'Admin', ''),
('bafd5576-a7a2-48e2-9f8b-b5e051ddc76', 'Lucas ', 'Alvarez', 'lucaas2120@gmail.com', '$2a$10$/lFMX7eMKrttb7ANGsILe.5bzdomAp3mEi7dD054O0Jki6Jw.mzpK', 'User', 'img-user-default.png'),
('c4c0f027-9fd0-4002-a5b6-eea70182637', 'Lucas G', 'Alvarez', 'lucas1994@bierfass.com.ar', '$2a$10$SkMdbXru8kZLmoo4mlagIuJNEcR8E7xsyCkginnHb1Uu5Y6DXiUDO', 'Admin', 'img-user-default.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);


--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
