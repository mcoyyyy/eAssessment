<?php
/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2017 (original work) Open Assessment Technologies SA;
 *
 *
 */

namespace oat\taoQtiItem\model\tasks;

use oat\oatbox\task\AbstractTaskAction;
use oat\oatbox\service\ServiceManager;
use oat\oatbox\task\Queue;
use oat\oatbox\task\Task;
use oat\taoQtiItem\model\qti\ImportService;

/**
 * Class ImportQtiItem
 * @package oat\taoQtiTest\models\tasks
 * @author Aleh Hutnikau, <hutnikau@1pt.com>
 */
class ImportQtiItem extends AbstractTaskAction implements \JsonSerializable
{
    const FILE_DIR = 'ImportQtiItemTask';
    const PARAM_CLASS_URI = 'class_uri';
    const PARAM_FILE = 'file';

    protected $service;

    /**
     * @param $params
     * @throws \common_exception_MissingParameter
     * @return \common_report_Report
     */
    public function __invoke($params)
    {
        if (!isset($params[self::PARAM_FILE])) {
            throw new \common_exception_MissingParameter('Missing parameter `' . self::PARAM_FILE . '` in ' . self::class);
        }

        //\common_ext_ExtensionsManager::singleton()->getExtensionById('tao');

        $file = $this->getFileReferenceSerializer()->unserializeFile($params['file']);
        return ImportService::singleton()->importQTIPACKFile($file, $this->getClass($params));
    }

    /**
     * @return string
     */
    public function jsonSerialize()
    {
        return __CLASS__;
    }

    /**
     * Create task in queue
     * @param array $packageFile uploaded file path
     * @param \core_kernel_classes_Class $class uploaded file
     * @return Task created task id
     */
    public static function createTask($packageFile, \core_kernel_classes_Class $class)
    {
        $action = new self();
        $action->setServiceLocator(ServiceManager::getServiceManager());

        $fileUri = $action->saveFile($packageFile, basename($packageFile));
        $queue = ServiceManager::getServiceManager()->get(Queue::SERVICE_ID);

        return $queue->createTask($action, [self::PARAM_FILE => $fileUri, self::PARAM_CLASS_URI => $class->getUri()]);
    }

    /**
     * @param array $taskParams
     * @return \core_kernel_classes_Class
     */
    private function getClass(array $taskParams)
    {
        $class = null;
        if (isset($taskParams[self::PARAM_CLASS_URI])) {
            $class = new \core_kernel_classes_Class($taskParams[self::PARAM_CLASS_URI]);
        }
        if ($class === null || !$class->exists()) {
            $class = new \core_kernel_classes_Class(TAO_ITEM_CLASS);
        }
        return $class;
    }
}