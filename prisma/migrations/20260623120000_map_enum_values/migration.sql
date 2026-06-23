
ALTER TABLE `Wood`
  MODIFY `type` ENUM('softwood', 'exotic_wood', 'noble_and_hardwoods', 'exotic wood', 'noble and hardwoods') NOT NULL;
ALTER TABLE `Wood`
  MODIFY `hardness` ENUM('tender', 'medium_hard', 'hard', 'medium hard') NOT NULL;

UPDATE `Wood` SET `type` = 'exotic wood' WHERE `type` = 'exotic_wood';
UPDATE `Wood` SET `type` = 'noble and hardwoods' WHERE `type` = 'noble_and_hardwoods';
UPDATE `Wood` SET `hardness` = 'medium hard' WHERE `hardness` = 'medium_hard';


ALTER TABLE `Wood`
  MODIFY `type` ENUM('softwood', 'exotic wood', 'noble and hardwoods') NOT NULL;
ALTER TABLE `Wood`
  MODIFY `hardness` ENUM('tender', 'medium hard', 'hard') NOT NULL;
