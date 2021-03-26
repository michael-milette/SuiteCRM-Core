<?php

namespace App\Routes\LegacyHandler;

use App\Engine\LegacyHandler\LegacyHandler;
use App\Engine\LegacyHandler\LegacyScopeState;
use App\Process\Service\ActionNameMapperInterface;
use App\Module\Service\ModuleNameMapperInterface;
use App\Routes\Service\RouteConverterInterface;
use InvalidArgumentException;
use RouteConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * Class RouteConverter
 *
 * @package App\Legacy
 */
class RouteConverterHandler extends LegacyHandler implements RouteConverterInterface
{
    public const HANDLER_KEY = 'route-converter';
    /**
     * @var ModuleNameMapperInterface
     */
    protected $moduleNameMapper;
    /**
     * Lazy initialized mapper
     * @var RouteConverter
     */
    protected $converter;
    /**
     * @var ActionNameMapperInterface
     */
    private $actionNameMapper;

    /**
     * SystemConfigHandler constructor.
     * @param string $projectDir
     * @param string $legacyDir
     * @param string $legacySessionName
     * @param string $defaultSessionName
     * @param LegacyScopeState $legacyScopeState
     * @param ModuleNameMapperInterface $moduleNameMapper
     * @param ActionNameMapperInterface $actionNameMapper
     * @param SessionInterface $session
     */
    public function __construct(
        string $projectDir,
        string $legacyDir,
        string $legacySessionName,
        string $defaultSessionName,
        LegacyScopeState $legacyScopeState,
        ModuleNameMapperInterface $moduleNameMapper,
        ActionNameMapperInterface $actionNameMapper,
        SessionInterface $session
    ) {
        parent::__construct($projectDir, $legacyDir, $legacySessionName, $defaultSessionName, $legacyScopeState, $session);
        $this->moduleNameMapper = $moduleNameMapper;
        $this->actionNameMapper = $actionNameMapper;
    }

    /**
     * @inheritDoc
     */
    public function getHandlerKey(): string
    {
        return self::HANDLER_KEY;
    }

    /**
     * Check if the given $request route is a Legacy route
     *
     * @param Request $request
     * @return bool
     */
    public function isLegacyRoute(Request $request): bool
    {
        if ($this->isLegacyViewRoute($request)) {
            return true;
        }

        if ($request->getPathInfo() !== '/') {
            return false;
        }

        $valid = false;
        $valid |= !empty($request->get('module'));
        $valid |= !empty($request->get('action'));
        $valid |= !empty($request->get('entryPoint'));

        return $valid;
    }

    /**
     * Check if the given $request route can be converted
     *
     * @param Request $request
     * @return bool
     */
    public function isLegacyViewRoute(Request $request): bool
    {
        if (!empty($request->getPathInfo()) && $request->getPathInfo() !== '/') {
            return false;
        }

        $module = $request->query->get('module');

        if (empty($module)) {
            return false;
        }

        if (!$this->moduleNameMapper->isValidModule($module)) {
            return false;
        }

        $action = $request->query->get('action');

        return $this->actionNameMapper->isValidAction($action);
    }

    /**
     * Convert given $uri route
     *
     * @param string $uri
     * @return string
     */
    public function convertUri(string $uri): string
    {
        $request = Request::create($uri);

        return $this->convert($request);
    }

    /**
     * Convert given $request route
     *
     * @param Request $request
     * @return string
     */
    public function convert(Request $request): string
    {
        $this->init();

        $module = $request->query->get('module');
        $action = $request->query->get('action');
        $record = $request->query->get('record');

        if (empty($module)) {
            throw new InvalidArgumentException('No module defined');
        }

        $queryParams = [];
        if (null !== $request->getQueryString()) {
            $queryParams = $request->query->all();
        }

        $converter = $this->getConverter();

        $result = $converter->convert($module, $action, $record, $queryParams);

        $this->close();

        return $result;
    }

    /**
     * Get mapper. Initialize it if needed
     * @return RouteConverter
     */
    protected function getConverter(): RouteConverter
    {
        if ($this->converter !== null) {
            return $this->converter;
        }

        /* @noinspection PhpIncludeInspection */
        require_once 'include/portability/RouteConverter.php';

        $this->converter = new RouteConverter();

        return $this->converter;
    }

    /**
     * Parse given $uri route
     *
     * @param string $uri
     * @return array
     */
    public function parseUri(string $uri): array
    {
        if (strpos($uri, '/#/') !== false) {
            $anchor = parse_url($uri, PHP_URL_FRAGMENT);
            $query = parse_url($uri, PHP_URL_QUERY);
            parse_str($query, $params);

            return [
                'route' => './#' . $anchor,
                'params' => $params
            ];
        }

        $this->init();

        $request = Request::create($uri);

        $module = $request->query->get('module');
        $action = $request->query->get('action');
        $record = $request->query->get('record');

        if (empty($module)) {
            throw new InvalidArgumentException('No module defined');
        }

        $queryParams = [];

        $converter = $this->getConverter();

        $route = $converter->convert($module, $action, $record, $queryParams);

        $result = [
            'route' => $route,
            'params' => $converter->excludeParams($request->query->all(), ['module', 'action', 'record']),
            'module' => $module
        ];

        $this->close();

        return $result;
    }
}